"use client";

import React, { useEffect, useState } from "react";
import { Container } from "./ui/container";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  AiOutlineSearch,
  AiOutlineTrophy,
  AiOutlineQuestionCircle,
  AiOutlineComment,
} from "react-icons/ai";
import { FaInbox } from "react-icons/fa";
import { Button } from "./ui/button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  const [focused, setFocused] = React.useState(false);
  return (
    <nav className=" py-2 border-t-[3px] border-primary">
      <Container>
        <div className="flex items-center gap-4">
          <Link className="relative w-60 h-10" href="/">
            <svg
              aria-hidden="true"
              className="text-white"
              width="150"
              height="37"
              viewBox="0 0 187 37"
              color="white"
            >
              <path
                d="m42 23-2.2-.2c-1.7-.1-2.3-.8-2.3-2 0-1.4 1-2.2 3-2.2 1.3-.1 2.6.3 3.6 1.1l1.3-1.3c-1.4-1-3.1-1.5-4.8-1.4-2.9 0-4.9 1.5-4.9 3.9 0 2.2 1.4 3.4 4 3.6l2.2.2c1.6.1 2.2.8 2.2 2 0 1.6-1.4 2.4-3.6 2.4-1.6.1-3.1-.5-4.2-1.6L35 28.8c1.5 1.4 3.5 2 5.5 1.9 3.2 0 5.5-1.5 5.5-4.1 0-2.6-1.6-3.4-4-3.6Zm15.8-6.1c-2.2 0-3.5.4-4.7 1.9l1.3 1.3c.8-1.1 2.1-1.7 3.4-1.5 2.5 0 3.4 1 3.4 2.9v1.3h-4c-3 0-4.6 1.5-4.6 3.9 0 1 .3 2 1 2.7.8.9 1.9 1.2 3.8 1.2 1.4.1 2.9-.4 3.9-1.4v1.3h2v-9.1c-.1-2.9-1.9-4.5-5.5-4.5Zm3.4 8.9c.1.8-.1 1.7-.7 2.3a4 4 0 0 1-3 .9c-2.1 0-3.1-.7-3.1-2.3 0-1.6 1-2.4 3-2.4h3.8v1.5Zm9.7-7.1c1.2 0 2.4.5 3.1 1.5l1.3-1.3a5.4 5.4 0 0 0-4.4-2c-3.4 0-5.9 2.3-5.9 6.9 0 4.6 2.6 6.9 5.9 6.9 1.7.1 3.3-.7 4.4-2L74 27.4c-.7 1-1.9 1.5-3.1 1.5-1.2.1-2.4-.5-3.1-1.5-.7-1.1-1-2.3-.9-3.6-.1-1.3.2-2.5.9-3.6.7-1 1.9-1.6 3.1-1.5Zm16.8-1.6h-2.4L79.2 23V11.1h-2v19.4h2v-4.9l2.4-2.4 4.5 7.3h2.4l-5.6-8.6 4.8-4.8Zm9.2-.16c-1.6-.1-3.2.5-4.3 1.7-1.3 1.3-1.6 2.9-1.6 5.4 0 2.5.3 4.1 1.6 5.4 1.1 1.1 2.7 1.7 4.3 1.7 1.6.1 3.2-.5 4.3-1.7 1.3-1.3 1.6-2.9 1.6-5.4 0-2.5-.3-4.1-1.6-5.4a5.38 5.38 0 0 0-4.3-1.7Zm1.7 10.5c-.9.8-2.3.8-3.2 0-.7-.7-.8-2-.8-3.4s.1-2.7.8-3.4c.9-.8 2.3-.8 3.2 0 .7.7.8 1.9.8 3.4s-.1 2.7-.8 3.4Zm13.6-10.4-2.8 8.6-2.8-8.6h-3.7l5.2 14h2.7l5.1-14h-3.7Zm9.6-.1c-3.6 0-6.1 2.6-6.1 7.1 0 5.7 3.2 7.2 6.5 7.2 2 .1 4-.7 5.3-2.2l-2.1-2.1c-.8.9-2 1.4-3.2 1.3-1.6.1-3-1.1-3.1-2.7v-.4h8.7v-1.6c.1-3.8-2.1-6.6-6-6.6Zm-2.7 5.8c0-.5.1-1 .3-1.5.4-.9 1.3-1.4 2.3-1.4 1-.1 1.9.5 2.3 1.4.2.5.3 1 .3 1.5h-5.2Zm13.33-4.3v-1.3h-3.4v14h3.5v-8.4c-.1-1.3.8-2.4 2.1-2.6h.2c.7 0 1.4.3 1.8.8l2.6-2.6a4.1 4.1 0 0 0-3.3-1.3c-1.3-.1-2.6.4-3.5 1.4Zm7.6-2.8v15.4h3.5v-11h2.6v-2.7h-2.6v-1.5c-.1-.6.3-1.2.9-1.3h1.6v-3h-2a3.9 3.9 0 0 0-4 3.8v.3Zm20.27 1.3c-1.6-.1-3.2.5-4.3 1.7-1.3 1.3-1.6 2.9-1.6 5.4 0 2.5.3 4.1 1.6 5.4 1.1 1.1 2.7 1.7 4.3 1.7 1.6.1 3.2-.5 4.3-1.7 1.3-1.3 1.6-2.9 1.6-5.4 0-2.5-.3-4.1-1.6-5.4a5.38 5.38 0 0 0-4.3-1.7Zm1.7 10.5c-.9.8-2.3.8-3.2 0-.7-.7-.8-2-.8-3.4s.1-2.7.8-3.4c.9-.8 2.3-.8 3.2 0 .7.7.8 1.9.8 3.4s-.1 2.7-.8 3.4Zm20.7-10.4-2.3 8.6-2.9-8.6H175l-2.8 8.7-2.3-8.6h-3.7l4.3 14h2.9l2.9-8.8 2.9 8.8h3l4.3-14-3.8-.1Zm-31.22 9.8v-15.2h-3.5v15.4a3.8 3.8 0 0 0 3.6 4h2.5v-3h-1.3c-.6.1-1.1-.2-1.3-.8v-.4ZM52.7 17.4H49V13h-2v13.9c0 2 1.1 3.6 3.4 3.6h1.4v-1.7h-1c-1.3 0-1.8-.7-1.8-2v-7.7h1.9l1.8-1.7Z"
                fill="#dfdfdf"
              ></path>
              <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
              <path
                d="m23.1 25.99.68-2.95-16.1-3.35L7 23l16.1 2.99ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm4.2-7.4L26 18.4l2.1-2.5L15.4 5.3l-2.1 2.5ZM21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0ZM7 30h16v-3H7v3Z"
                fill="#F48024"
              ></path>
            </svg>
          </Link>
          <Button className="text-sm">Products</Button>
          <Input
            type="text"
            placeholder="Search"
            icon={<AiOutlineSearch />}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={focused ? "ring-4 ring-blue-900" : ""}
          />
          <Link className="text-sm" href={"/users"}>
            User
          </Link>
          <Button className="text-secondary bg-transparent text-xl">
            <FaInbox />
          </Button>
          <Button className="text-secondary bg-transparent text-xl">
            <AiOutlineTrophy />
          </Button>
          <Button className="text-secondary bg-transparent text-xl">
            <AiOutlineQuestionCircle />
          </Button>
          <Button className="text-secondary bg-transparent text-xl">
            <AiOutlineComment />
          </Button>
        </div>
      </Container>
    </nav>
  );
};
export default Navbar;
