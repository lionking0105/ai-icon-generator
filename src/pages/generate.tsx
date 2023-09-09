import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InputForm } from "~/components/form";

const GeneratePage: NextPage = () => {
  const [imageUrls, setImageUrls] = useState<{ imageUrl: string }[]>([]);
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-16 flex min-h-screen flex-col px-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Generate your icon
        </h1>
        {!isLoggedIn && (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Please log in to start generating your icons.
          </p>
        )}
        {isLoggedIn && (
          <div className="mt-12 grid lg:grid-cols-3 lg:gap-8">
            <div className="w-full lg:col-span-1 lg:mr-8">
              <InputForm setImageUrls={setImageUrls} />
            </div>
            <div className="mt-8 w-full flex-row rounded-lg border bg-gray-50 p-8 lg:col-span-2 lg:mt-0">
              <p className="leading-7">Your Icons</p>
              {imageUrls.length > 0 && (
                <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {imageUrls.map((image) => (
                    <Link
                      key={image.imageUrl}
                      href={image.imageUrl}
                      target="_blank"
                    >
                      <Image
                        alt="an image of generated prompt"
                        src={image.imageUrl}
                        width={256}
                        height={256}
                      />
                    </Link>
                  ))}
                </section>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
