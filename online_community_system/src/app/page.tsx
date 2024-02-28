// import Image from 'next/image'
// import './globals.css';
// import {redirect} from 'next/navigation';

// export default function Home() {
//   redirect("/landing");
//   return (
//     <h3>Welcome to our application</h3>
//   );
// }
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
  // If neither "admin" nor "student" is present, render the welcome message
  return (
    <h3>Welcome to our application</h3>
  );
}
