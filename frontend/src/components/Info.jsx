import { Button } from "@material-tailwind/react";
import { Outlet, Link } from "react-router-dom";


export function Info() {
  return (
    <>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 container mx-auto lg:py-20">
        <div>
          <div className="md:text-8xl text-5xl ">Video Uploading site</div>
          <div className="p-8">
            A new way to watch contents and upload and videos are sensored for
            users{" "}
          </div>
        </div>
        <img
          className="h-96 w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1605106325682-3482f7c1c9c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoYXBlc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="No image"
        />
      </div>
      <div className="px-14 py-6">
      <Link to="/dashboard">
        <Button className="" variant="outlined">
          Launch App
        </Button>
      </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Info;
