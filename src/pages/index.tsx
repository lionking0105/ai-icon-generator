import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GenerateIconForm } from "~/components/generateIconForm/GenerateIconForm";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export type imageUrls = { imageUrl: string }[];

const GenerateGallery = ({ imageUrls }: { imageUrls: imageUrls }) => {
  return (
    <>
      {imageUrls.length > 0 && (
        <section className="grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageUrls.map((image) => (
            <Link key={image.imageUrl} href={image.imageUrl} target="_blank">
              <Image
                alt="an image of generated prompt"
                src={image.imageUrl}
                width={256}
                height={256}
                className="rounded-lg border"
              />
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

const HomePage: NextPage = () => {
  const [imageUrls, setImageUrls] = useState<imageUrls>([]);
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Icon Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto my-8 flex flex-col px-8">
        <div className="grid lg:grid-cols-3 lg:gap-6">
          <Card className="min-h-[288px] w-full lg:col-span-1 lg:mr-8">
            {isLoggedIn && (
              <>
                <CardHeader>
                  <CardTitle>Generate your icon</CardTitle>
                </CardHeader>
                <GenerateIconForm
                  setImageUrls={setImageUrls}
                  imageUrls={imageUrls}
                />
              </>
            )}
            {!isLoggedIn && (
              <>
                <CardHeader>
                  <CardTitle>Generate your icon</CardTitle>
                  <CardDescription>Login to begin prompting</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => void signIn("google")}>Login</Button>
                </CardContent>
              </>
            )}
          </Card>

          <Card className="mt-8 min-h-[288px] w-full bg-gray-50 lg:col-span-2 lg:mt-0 lg:min-h-full">
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Work on this, add a carousel */}
              <GenerateGallery imageUrls={imageUrls} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default HomePage;
