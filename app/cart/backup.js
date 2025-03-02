<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <a href="#" className="w-20 shrink-0 md:order-1">
                                        <img
                                            className="h-20 w-20 dark:hidden"
                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
                                            alt="imac image"
                                        />
                                        <img
                                            className="hidden h-20 w-20 dark:block"
                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg"
                                            alt="imac image"
                                        />
                                    </a>
                                    <label htmlFor="counter-input" className="sr-only">
                                        Choose quantity:
                                    </label>
                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                id="decrement-button-5"
                                                data-input-counter-decrement="counter-input-5"
                                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                            >
                                                <svg
                                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 2"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 1h16"
                                                    />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                id="counter-input-5"
                                                data-input-counter=""
                                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                                placeholder=""
                                                defaultValue={3}
                                                required=""
                                            />

                                            {/* incrementer */}
                                            <div className="flex items-center">
                                                <button onClick={() => decrementQuantity(item.id)} className="p-2 border">-</button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button onClick={() => incrementQuantity(item.id)} className="p-2 border">+</button>
                                            </div>


                                        </div>


                                        <div className="text-end md:order-4 md:w-32">
                                            <p className="text-base font-bold text-gray-900 dark:text-white">
                                                {item.p_price}
                                            </p>
                                        </div>


                                    </div>


                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                        <a
                                            href="#"
                                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                                        >
                                            {item.p_name}
                                        </a>
                                        <div className="flex items-center gap-4">

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                type="button"
                                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                            >
                                                <svg
                                                    className="me-1.5 h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18 17.94 6M18 18 6.06 6"
                                                    />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>


                                    
                                </div>
                            </div>