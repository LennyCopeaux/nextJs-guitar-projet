import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-line bg-white p-7">
      <div>
        <h1 className="text-2xl font-semibold">Inscription</h1>
        <p className="mt-2 text-sm text-muted">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="font-semibold text-brand">
            Se connecter
          </Link>
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
