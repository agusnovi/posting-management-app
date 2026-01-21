'use client'
import Image from "next/image"
import Link from "next/link"
import cs from "classnames"
import { useState } from "react"
import logo from "@/assets/logo.png"

import styles from "./header.module.scss"

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className={styles.mobile}>
          <Link href="/" className={styles.image}>
            <Image
              priority
              src={logo}
              alt="mobile-logo"
              width={80}
              height={80}
            />
          </Link>
          <button className={styles.menu} onClick={() => setOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#ffffff"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
        <nav className={cs(styles.nav, open && styles.show)}>
          <ul>
            <li className={styles.close}>
              <button onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#ffffff"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </li>
            <li className={styles['desktop-logo']}>
              <Link href="/" onNavigate={() => setOpen(false)}>
                <div className={styles.image}>
                  <Image priority src={logo} alt="logo" width={80} height={80} />
                </div>
              </Link>
            </li>
            <li>
              <Link href="/feed" onNavigate={() => setOpen(false)}>
                Feed
              </Link>
            </li>
            <li>
              <Link href="/new-post" onNavigate={() => setOpen(false)}>
                New Post
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={styles.backdrop}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      </>
    );
}
