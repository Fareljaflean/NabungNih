"use server";

import { hash } from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export type RegistrationState = {
  error?: string;
};

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi.").max(80, "Nama maksimal 80 karakter."),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid.")
    .max(254, "Email terlalu panjang.")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(12, "Password minimal 12 karakter.")
    .refine(
      (password) => new TextEncoder().encode(password).length <= 72,
      "Password terlalu panjang.",
    ),
});

export async function registerUser(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const parsedInput = registrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedInput.success) {
    return { error: parsedInput.error.issues[0]?.message ?? "Periksa kembali data Anda." };
  }

  const { name, email, password } = parsedInput.data;
  const passwordHash = await hash(password, 12);

  try {
    await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Email sudah terdaftar." };
    }
    throw error;
  }

  redirect("/login?registered=1");
}
