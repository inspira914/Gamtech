"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarContent,
  Button,
  Avatar,
  Link,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { HiShoppingCart, HiSun, HiMoon } from "react-icons/hi2";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { TbDiscount2, TbCategory2, TbHomeMove } from "react-icons/tb";
import { signIn, signOut, useSession } from "next-auth/react";

import { useTheme } from "next-themes";

import Image from "next/image";
import Cart from "./cart";
import { CartContext } from "@/providers/cart";
import { PackageCheck } from "lucide-react";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const { status, data } = useSession();

  const { numTotalItems } = useContext(CartContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLoginClick = async () => {
    await signIn("google");
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Navbar className="bg-white shadow-xl dark:bg-[#181717]">
      <NavbarContent as="div" justify="start">
        <Link href="/">
          <Image
            src="/gamtech.png"
            alt="Foxtech"
            width={200}
            height={50}
            style={{ objectFit: "contain" }}
            className="h-auto w-36"
          />
        </Link>
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="flex items-center gap-6">
        <Sheet>
          <div className="relative">
            <SheetTrigger asChild>
              <Button
                variant="light"
                isIconOnly
                startContent={<HiShoppingCart size={28} />}
              />
              <Button
                variant="dark"
                startContent={<HiShoppingCart size={38} />}
              />
              <Button
                variant="dark"
                startContent={<HiShoppingCart size={38} />}
              />
            </SheetTrigger>

            <div
              className={`${numTotalItems >= 1 ? "block" : "hidden"
                } cursor-default select-none`}
            >
              <div className="absolute -top-1 left-6">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-gamtech p-3 text-xs text-white">
                  {numTotalItems}
                </p>
              </div>
            </div>
          </div>

          <SheetContent side={"left"} className="overflow-y-auto">
            <SheetHeader className="flex items-center">
              <Chip
                startContent={<HiShoppingCart size={20} />}
                color="primary"
                variant="bordered"
                className="cursor-default p-[1.125rem] text-black dark:text-white"
                radius="lg"
              >
                <span className="font-bold uppercase">Carrinho</span>
              </Chip>
            </SheetHeader>

            <Cart />
          </SheetContent>
        </Sheet>

        <Sheet>
          {status === "loading" ? (
            <Spinner size="md" color="primary" />
          ) : (
            <SheetTrigger asChild>
              {status === "unauthenticated" ? (
                <Avatar
                  showFallback
                  src=""
                  isBordered
                  color="primary"
                  className="h-9 w-9 cursor-pointer text-large transition-all hover:scale-105"
                />
              ) : (
                <Avatar
                  showFallback
                  src={data?.user?.image!}
                  isBordered
                  color="primary"
                  className="h-9 w-9 cursor-pointer text-large transition-all hover:scale-105"
                />
              )}
            </SheetTrigger>
          )}

          <SheetContent side={"right"}>
            <SheetHeader>
              <h1 className="mx-auto mb-4 text-lg font-semibold">Dashboard</h1>
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <div className="mb-4 flex flex-col items-center justify-center gap-4 md:flex-row">
                <Avatar
                  showFallback
                  src={data?.user?.image!}
                  className="h-20 w-20 text-large"
                ></Avatar>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">{data?.user?.name}</p>
                  <p className="text-tiny text-foreground-500">
                    {data?.user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Login & Theme toggle */}
            <div className="flex flex-col gap-2">
              <div className="flex w-full gap-2">
                {status === "unauthenticated" ? (
                  <Button
                    variant="solid"
                    color="primary"
                    className="w-full transition-all hover:bg-[#1267dc]/70"
                    endContent={<FiLogIn size={20} />}
                    onClick={handleLoginClick}
                  >
                    Fazer Login
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    color="primary"
                    className="w-full transition-all hover:bg-[#1267dc]/70"
                    endContent={<FiLogOut size={20} />}
                    onClick={handleLogoutClick}
                  >
                    Fazer Logout
                  </Button>
                )}
                <Button
                  variant="solid"
                  className="hoverButton"
                  endContent={
                    theme === "dark" ? (
                      <HiSun size={20} />
                    ) : (
                      <HiMoon size={20} />
                    )
                  }
                  onClick={toggleTheme}
                  isIconOnly
                />
              </div>

              {status === "authenticated" && data.user && (
                <Link href="/orders">
                  <Button
                    color="default"
                    className="hoverButton w-full"
                    endContent={<PackageCheck size={20} />}
                  >
                    Meus pedidos
                  </Button>
                </Link>
              )}
            </div>

            <Separator className="my-4" />

            <h1 className="mx-auto mb-4 flex justify-center text-lg font-semibold">
              Descubra
            </h1>

            <div className="flex flex-col items-center justify-center gap-2">
              <Link href="/" className="w-full">
                <Button
                  color="default"
                  endContent={<TbHomeMove size={20} />}
                  className="hoverButton w-full"
                >
                  Página inicial
                </Button>
              </Link>

              <Link href="/promo" className="w-full">
                <Button
                  color="default"
                  endContent={<TbDiscount2 size={20} />}
                  className="hoverButton w-full"
                >
                  Ofertas imperdíveis
                </Button>
              </Link>

              <Link href="/categories" className="w-full">
                <Button
                  color="default"
                  endContent={<TbCategory2 size={20} />}
                  className="hoverButton w-full"
                >
                  Categorias
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </NavbarContent>
    </Navbar>
  );
}
