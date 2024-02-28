'use client'
import Image from 'next/image';
import './globals.css';
import {redirect} from 'next/navigation';

export default function Home() {

  const isAdmin = localStorage.getItem('admin');
  if (isAdmin) {
    redirect("/admin");
    return null; 
  }

  const isStudent = localStorage.getItem('student');
  if (isStudent) {
    redirect("/student");
    return null; 
  }

  redirect("/landing");
  return (
    <h3>Welcome to our application</h3>
  );
}
