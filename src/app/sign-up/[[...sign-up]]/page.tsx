// import Wrapper from "@/components/shared/Wrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    // <Wrapper>
    <div className="flex items-center justify-center w-full my-10">
      <SignUp afterSignUpUrl={"/product/:path*"} />
    </div>
    // </Wrapper>
  );
}
