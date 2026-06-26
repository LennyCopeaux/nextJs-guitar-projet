import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-line bg-white p-7">
      <div>
        <h1 className="text-2xl font-semibold">Connexion</h1>
        <p className="mt-2 text-sm text-muted">
          Pas encore de compte ?{" "}
          <Link href="/auth/register" className="font-semibold text-brand">
            S&apos;inscrire
          </Link>
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
