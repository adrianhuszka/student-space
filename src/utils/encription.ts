import Cryptr from "cryptr";

export function encrypt(text: string): string {
  const secret = process.env.NEXTAUTH_SECRET ?? "";
  const cryptr = new Cryptr(secret);

  const enryptedText = cryptr.encrypt(text ?? "");
  return enryptedText;
}

export function decrypt(text: string): string {
  const secret = process.env.NEXTAUTH_SECRET ?? "";
  const cryptr = new Cryptr(secret);

  const decryptedText = cryptr.decrypt(text ?? "");
  return decryptedText;
}
