"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Flex, Spacer, Center, Text, Box, Square } from "@chakra-ui/react";
import { prisma } from "@/lib/prisma";
import {
  storyblokInit,
  apiPlugin,
  getStoryblokApi,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_API,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
});

export default async function Home({ blok }) {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });

  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
