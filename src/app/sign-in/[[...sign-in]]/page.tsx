// import Wrapper from "@/components/shared/Wrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    //<Wrapper>
    <>
      <div className="flex items-center justify-center w-full my-10">
        <SignIn afterSignInUrl={"/product/:path*"} />
      </div>
    </>
    // </Wrapper>
  );
}
