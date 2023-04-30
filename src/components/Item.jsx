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
                    className="flex flex-col items-start justify-between"
                  >
                    <div className="relative w-full">
                      <a href={post.href}>
                        <img
                          src={post.imageUrl}
                          alt=""
                          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        />
                      </a>
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
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
                      <div className="relative mt-8 flex items-center gap-x-4">
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <a href={post.authorhref}>
                              <span className="absolute inset-0" />
                              {post.authorName}
                            </a>
                          </p>
                        </div>
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
