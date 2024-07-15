import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const subscriptionData = [
  { id: 1, name: "John Doe", avatar: "https://docs.material-tailwind.com/img/face-2.jpg", description: "Software Engineer" },
  { id: 2, name: "Jane Smith", avatar: "https://docs.material-tailwind.com/img/face-1.jpg", description: "Graphic Designer" },
  { id: 3, name: "Michael Johnson", avatar: "https://docs.material-tailwind.com/img/face-3.jpg", description: "Project Manager" },
  { id: 4, name: "Emily Davis", avatar: "https://docs.material-tailwind.com/img/face-4.jpg", description: "Data Scientist" },
  { id: 5, name: "William Brown", avatar: "https://docs.material-tailwind.com/img/face-5.jpg", description: "Marketing Specialist" }
];

export function SidebarDefault() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] shadow-none w-full max-w-[20rem] p-4 shadow-blue-gray-900/5">
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Home
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Popular
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Popular
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
          <ListItem>
          <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
                Categories
              </Typography>
          </ListItem>
          <ListItem>
          <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
                Favorite
              </Typography>
          </ListItem>
          
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <h1 className="font-bold">Subscription</h1>
        {subscriptionData.map((subscriber) => (
          <div key={subscriber.id} className="flex items-center gap-4 cursor-pointer py-2">
            <Avatar src={subscriber.avatar} alt={subscriber.name} />
            <div>
              <Typography variant="h6">{subscriber.name}</Typography>
              {/* <Typography variant="small" color="gray">{subscriber.description}</Typography> */}
            </div>
          </div>
        ))}
      </List>
    </Card>
  );
}
