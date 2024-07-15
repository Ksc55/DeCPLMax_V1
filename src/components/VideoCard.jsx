import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
    Avatar,
  } from "@material-tailwind/react";
  import { ShareIcon } from "@heroicons/react/24/outline"; // Import the share icon
  
  export function VideoCard() {
    return (
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <IconButton
            size="sm"
            color="blue"
            variant="text"
            className="ml-auto !absolute top-4 right-14 rounded-full"
          >
            <ShareIcon className="h-6 w-6" />
          </IconButton>
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton>
        </CardHeader>
        <CardBody className="flex">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
          <div className="flex flex-col ml-5">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              How to learn JavaScript
            </Typography>
            <Typography color="gray">
              In this video we will learn how to learn JavaScript in 2021 and beyond
            </Typography>
            
          </div>
         
        </CardBody>
        <CardFooter className="pt-3">
          {/* You can add any footer content here */}
        </CardFooter>
        
      </Card>
    );
  }
  