import { Button } from "@material-tailwind/react";
import { Outlet, Link } from "react-router-dom";
import Image from '../assets/ai-generated-8627457_1280.png'

export function Info() {
  return (
    <>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 container mx-auto lg:py-20">
        <div>
          <div className="md:text-8xl text-5xl ">DeCPLMax </div>
          <div className="p-4">

          Modern entrepreneurs seek a secure and profitable video advertising and affiliate marketing platform to effectively market their products, expand their customer base, and generate quality leads. Existing platforms that rely on pay-per-click or cost-per-impression models fail to ensure lead quality, relevance, and proper content ownership, resulting in inefficient conversions and inadequate user incentives. DeCPLMax addresses these issues, offering a comprehensive solution            users{" "}
          </div>
        </div>
        <img
          className="h-96 w-full object-cover object-center"
          src={Image}
          alt="No image"
        />
      </div>
      <div className="px-14 py-4">
      {/* <Link to="/dashboard">
        <Button className="" variant="outlined">
          Launch App
        </Button>
      </Link> */}
      </div>
      <Outlet />
    </>
  );
}

export default Info;
