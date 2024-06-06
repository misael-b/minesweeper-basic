"use server";

import { redirect } from 'next/navigation'

export async function login() {
    redirect("/login");
}

export async function register() {
    redirect("/register");
}

export async function minesweeper() {
    redirect("/")
}