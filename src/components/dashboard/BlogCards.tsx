

import user2 from "/src/assets/images/profile/user-2.jpg";
import user3 from "/src/assets/images/profile/user-3.jpg";
import img1 from "/src/assets/images/blog/blog-img1.jpg";
import img2 from "/src/assets/images/blog/blog-img2.jpg";
import img3 from "/src/assets/images/blog/blog-img3.jpg";
import { Badge } from "flowbite-react";
import { TbPoint }   from "react-icons/tb";
import { Icon } from "@iconify/react";
import { Link } from "react-router";


const BlogCardsData = [
  {
    avatar: user2,
    coveravatar: img1,
    read: "2 min Read",
    title: "As yen tumbles, gadget-loving Japan goes for secondhand iPhones",
    category: "Social",
    name: "Georgeanna Ramero",
    view: "9,125",
    comments: "3",
    time: "Mon, Dec 19",
    url:''
  },
  {
    avatar: user2,
    coveravatar: img2,
    read: "2 min Read",
    title:
      "Intel loses bid to revive antitrust case against patent foe Fortress",
    category: "Gadget",
    name: "Georgeanna Ramero",
    view: "4,150",
    comments: "38",
    time: "Sun, Dec 18",
    url:''
  },
  {
    avatar: user3,
    coveravatar: img3,
    read: "2 min Read",
    title: "COVID outbreak deepens as more lockdowns loom in China",
    category: "Health",
    name: "Georgeanna Ramero",
    view: "9,480",
    comments: "12",
    time: "Sat, Dec 17",
    url:''
  },
];

const BlogCards = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h5 className="card-title">Latest Blog Posts</h5>
      </div>
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full overflow-x-hidden">
          {BlogCardsData.map((item, index) => (
            <div key={index} className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 min-w-0">
              <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={item.avatar}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.category && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {item.category}
                    </span>
                  )}
                </div>
                <h6 className="text-base font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 overflow-hidden leading-tight">
                  {item.title}
                </h6>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
                      <img
                        src={item.avatar}
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.author || 'Author'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.date || '2 days ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <Icon icon="solar:heart-linear" className="w-4 h-4" />
                    <Icon icon="solar:share-linear" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
