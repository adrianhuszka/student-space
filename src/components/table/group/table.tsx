"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { columns, Group } from "./data";
import { ChevronDownIcon } from "@/components/icons/cherron-dropdown";
import { PlusIcon } from "@/components/icons/plus";
import { SearchIcon } from "@/components/icons/searchicon";
import { capitalize } from "@/utils/capitalize";
import { Pagination } from "@nextui-org/pagination";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import RenderCell from "./render-cell";
import { Select, SelectItem } from "@nextui-org/select";
import { AddGroup } from "@/components/pages/groups/add-group-modal";
import { useDisclosure } from "@nextui-org/modal";
import { useGetGroups } from "@/data/get-groups";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "@/hooks/debounce";

const INITIAL_VISIBLE_COLUMNS = ["name", "realmRoles", "path", "actions"];

export default function GroupTableWrapper() {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const { data, error, fetchStatus, refetch } = useGetGroups({
    search: filterValue,
    page: page - 1,
    size: rowsPerPage,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const debouncedRefetch = useDebounce(() => {
    refetch();
  }, 100);

  useEffect(() => {
    debouncedRefetch();
  }, [page, rowsPerPage, filterValue]);

  const groups = useMemo(() => {
    console.log("selectedGroup.subGroups", selectedGroup?.subGroups);
    if (selectedGroup && selectedGroup.subGroups.length > 0) {
      return selectedGroup.subGroups;
    }
    if (data?.length > 0) {
      return data;
    }
    return [];
  }, [data, selectedGroup]);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredGroups = [...groups];

    if (hasSearchFilter) {
      filteredGroups = filteredGroups.filter((Group) =>
        Group.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredGroups;
  }, [groups, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Group, b: Group) => {
      const first = a[sortDescriptor.column as keyof Group] as number;
      const second = b[sortDescriptor.column as keyof Group] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            size="sm"
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {groups.length} Groups
          </span>
          <Select
            label="Rows per page:"
            labelPlacement="outside-left"
            size="sm"
            className="bg-transparent outline-none text-default-400 text-small w-36"
            onChange={onRowsPerPageChange}
            defaultSelectedKeys={[rowsPerPage.toString()]}
          >
            <SelectItem key="20" value="20">
              20
            </SelectItem>
            <SelectItem key="50" value="50">
              50
            </SelectItem>
            <SelectItem key="100" value="100">
              100
            </SelectItem>
          </Select>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    onOpen,
    groups.length,
    onRowsPerPageChange,
    rowsPerPage,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "",
          td: "text-start",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody emptyContent={"No Groups found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell
                  className="text-start"
                  onClick={(e) => {
                    if (columnKey === "actions") {
                      e.stopPropagation();
                    }
                  }}
                >
                  {RenderCell({
                    group: item,
                    columnKey: columnKey,
                    setSelectedGroup,
                    selectedGroup,
                    data,
                  })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddGroup isOpen={isOpen} onOpenChange={onOpenChange} groups={groups} />
    </>
  );
}
