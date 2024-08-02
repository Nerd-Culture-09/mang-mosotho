import React from 'react'
import { Facebook, Github, Instagram, LinkedinIcon, Twitter } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div> 
              
        <footer className="bg-slate-200 rounded-lg shadow dark:bg-black m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex z-50 justify-center gap-5 p-5">
                        <Image
                            src={'/nu.png'}
                            width={30}
                            height={10}
                            alt='nucleus logo'
                        /> 
                        <div className="social-icons">
                            <Link
                            href="https://www.linkedin.com/in/nucleus-devs-5295a7262/"
                            style={{ color: "white" }}
                            target="_blank" 
                            rel="nucleus devs"
                            >
                            <LinkedinIcon />
                            </Link>
                        </div>
                        <div className="social-icons">
                            <Link href="https://web.facebook.com/nucleusdevs.09"
                            style={{ color: "white" }}
                            target="_blank" 
                            rel="nucleus devs"
                            >
                            <Facebook />
                            </Link>
                        </div>
                        <div>
                            <Link
                            href="https://github.com/ragmer09toske"
                            style={{ color: "white" }}
                            target="_blank" 
                            rel="nucleus devs"
                            >
                            <Github />
                            </Link>
                        </div>
                        <div className="social-icons">
                            <Link
                            href="https://www.instagram.com/nucleus_creative_studio/"
                            style={{ color: "white" }}
                            target="_blank" 
                            rel="nucleus devs"
                            >
                            <Instagram />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-full justify-center'>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    <span className="block text-xs text-center text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Nucleus™</a>. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    </div>
  )
}


