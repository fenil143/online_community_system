import Image from 'next/image'
import './globals.css';
import {redirect} from 'next/navigation';

export default function Home() {
  redirect("/landing");
  return (
    <h3>Welcome to our application</h3>
  );
}