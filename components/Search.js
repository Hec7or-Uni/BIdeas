import { useMemo, useRef, useState } from "react"
import { createAutocomplete } from "@algolia/autocomplete-core"
import Link from "next/link"
import { FiSearch } from "react-icons/fi"

const AutocompleteItem = ({
  id,
  avatar,
  userName,
  teamName,
  studies,
  motto,
}) => {
  return (
    <li>
      <Link href={userName ? `/users/${userName}` : `/teams/${teamName}`}>
        <a className="flex p-2 gap-x-4 hover:bg-color-light-neutral-2 m-2 rounded-lg">
          <div className="h-12 w-12 rounded-lg ">
            {/* img */}
            <img
              src={
                userName
                  ? avatar || "/personas/DefaultAvatar.jpg"
                  : avatar || "/personas/DefaultTeamAvatar.png"
              }
              alt={"profile image of" + userName || teamName}
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold truncate">
              {userName || teamName}
            </h3>
            <p className="text-xs text-gray-600 truncate">{studies || motto}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  })

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Search Baking Ideas...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "offers-next-api",
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then((res) => res.json())
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  )

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  })

  return (
    <form
      ref={formRef}
      className="hidden md:flex ml-8 justify-center"
      {...formProps}
    >
      <div className="flex items-center relative px-3 bg-white rounded-lg">
        <FiSearch className="w-5 h-5" />
        <input
          ref={inputRef}
          className="flex-1 rounded-lg w-full py-2 pl-3 focus:outline-none"
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className="absolute top-0 left-0 border-gray-100 mt-12 bg-white overflow-hidden rounded-lg z-10"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection
              console.log({ items })
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </div>
    </form>
  )
}
