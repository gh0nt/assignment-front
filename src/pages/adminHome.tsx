import AdminEvaluations from '@/components/admin/Projects/Projects.component'
import StudentEvaluations from '@/components/student/Projects/Projects.component'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Inicio', href: '#', current: true },
]
const userNavigation = [
  { name: 'Perfil', href: '#' },
  { name: 'Configuraciones', href: '#' },
  { name: 'Cerrar sesión', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminHome() {
  return (
    <>
      <div className="tw-min-h-full">
        <Disclosure as="nav" className="tw-bg-gray-800">
          {({ open }) => (
            <>
              <div className="tw-mx-auto tw-max-w-7xl tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <div className="tw-flex tw-h-16 tw-items-center tw-justify-between">
                  <div className="tw-flex tw-items-center">
                    <div className="tw-flex-shrink-0">
                      <img
                        className="tw-h-8 tw-w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="tw-hidden md:tw-block">
                      <div className="tw-ml-10 tw-flex tw-items-baseline tw-space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'tw-bg-gray-900 tw-text-white'
                                : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
                              'tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="tw-hidden md:tw-block">
                    <div className="tw-ml-4 tw-flex tw-items-center md:tw-ml-6">
                      <button
                        type="button"
                        className="tw-relative tw-rounded-full tw-bg-gray-800 tw-p-1 tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800"
                      >
                        <span className="tw-absolute -tw-inset-1.5" />
                        <span className="tw-sr-only">View notifications</span>
                        <BellIcon className="tw-h-6 tw-w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="tw-relative tw-ml-3">
                        <div>
                          <MenuButton className="tw-relative tw-flex tw-max-w-xs tw-items-center tw-rounded-full tw-bg-gray-800 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800">
                            <span className="tw-absolute -tw-inset-1.5" />
                            <span className="tw-sr-only">Open user menu</span>
                            <img className="tw-h-8 tw-w-8 tw-rounded-full" src={user.imageUrl} alt="" />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-48 tw-origin-top-right tw-rounded-md tw-bg-white tw-py-1 tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-transition focus:tw-outline-none data-[closed]:tw-scale-95 data-[closed]:tw-transform data-[closed]:tw-opacity-0 data-[enter]:tw-duration-100 data-[leave]:tw-duration-75 data-[enter]:tw-ease-out data-[leave]:tw-ease-in"
                        >
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              {({ focus }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    focus ? 'tw-bg-gray-100' : '',
                                    'tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700',
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>
                  <div className="-tw-mr-2 tw-flex md:tw-hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="tw-relative tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-gray-800 tw-p-2 tw-text-gray-400 hover:tw-bg-gray-700 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800">
                      <span className="tw-absolute -tw-inset-0.5" />
                      <span className="tw-sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="md:tw-hidden">
                <div className="tw-space-y-1 tw-px-2 tw-pb-3 tw-pt-2 sm:tw-px-3">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'tw-bg-gray-900 tw-text-white' : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
                        'tw-block tw-rounded-md tw-px-3 tw-py-2 tw-text-base tw-font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="tw-border-t tw-border-gray-700 tw-pb-3 tw-pt-4">
                  <div className="tw-flex tw-items-center tw-px-5">
                    <div className="tw-flex-shrink-0">
                      <img className="tw-h-10 tw-w-10 tw-rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="tw-ml-3">
                      <div className="tw-text-base tw-font-medium tw-leading-none tw-text-white">{user.name}</div>
                      <div className="tw-text-sm tw-font-medium tw-leading-none tw-text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="tw-relative tw-ml-auto tw-flex-shrink-0 tw-rounded-full tw-bg-gray-800 tw-p-1 tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800"
                    >
                      <span className="tw-absolute -tw-inset-1.5" />
                      <span className="tw-sr-only">View notifications</span>
                      <BellIcon className="tw-h-6 tw-w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="tw-mt-3 tw-space-y-1 tw-px-2">
                    {userNavigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="tw-block tw-rounded-md tw-px-3 tw-py-2 tw-text-base tw-font-medium tw-text-gray-400 hover:tw-bg-gray-700 hover:tw-text-white"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        <header className="tw-bg-white tw-shadow">
          <div className="tw-mx-auto tw-max-w-7xl tw-px-4 tw-py-6 sm:tw-px-6 lg:tw-px-8">
            <h1 className="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900">Panel Administrativo</h1>
          </div>
        </header>
        <main>
          <div className="tw-mx-auto tw-max-w-7xl tw-px-4 tw-py-6 sm:tw-px-6 lg:tw-px-8">
            <AdminEvaluations/>
          </div>
        </main>
      </div>
    </>
  )
}
