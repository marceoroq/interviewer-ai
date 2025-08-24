import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { APP_NAME } from "@/constants";

const user = {
  name: "Chelo",
  image: "/user-avatar.jpg",
};

export const Header = () => {
  return (
    <header className="flex items-center">
      <div className="flex w-full justify-between max-w-7xl mx-auto py-4 px-8 xl:px-4">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" width={38} height={32} alt="app logo" />
            <h2 className="font-medium text-xl">{APP_NAME}</h2>
          </div>
        </Link>
        <Avatar className="size-12">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="text-2xl">{user.name!.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
