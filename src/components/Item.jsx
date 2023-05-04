import React from "react";

export const Item = ({ post }) => {
  return (
    <>
      {post && (
        <div className="lg:col-span-3">
          <div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {post.map((post) => (
                  <article
                    key={post.id}
                    className=" flex-col items-start justify-between"
                  >
                    <a href={post.href} target="_blank">
                      <div className="relative w-full">
                        <img
                          src={post.imageUrl}
                          alt=""
                          className="aspect-[16/9] w-full rounded-2xl bg-gray-100  sm:aspect-[2/1] lg:aspect-[3/2]"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </a>

                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <a
                          // href={post.category.href}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {post.title}
                        </a>
                      </div>
                      <div className="group relative">
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
