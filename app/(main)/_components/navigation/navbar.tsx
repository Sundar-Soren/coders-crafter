"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Languages, SearchIcon } from "lucide-react";
import Logo from "./logo";
import { useStore } from "@/hooks/store";
import { MobileSidebar } from "./mobile-sidebar";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { letsSearch } = useStore();
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-40 w-full px-10 py-5 gap-2 bg-white flex justify-between">
      <MobileSidebar />
      <div className="hidden md:block">
        <Logo />
      </div>
      <div>
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          <Input
            type="text"
            placeholder="Search courses by title, description, chapter, or lesson..."
            onChange={(e) => letsSearch(e.target.value)}
            className="flex h-10 lg:w-[30rem] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset w-full  rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
          />
          <Button type="submit" className="rounded-none rounded-r-lg ">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </form>
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430_1280.png" />
          <AvatarFallback>My Pic</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
