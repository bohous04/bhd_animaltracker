import { isEnvBrowser } from "./utils"

interface DebugEvent<T = unknown> {
  action: string
  data: T
}

export const debugData = <P>(events: DebugEvent<P>[], timer = 1000): void => {
  if (import.meta.env.MODE === "development" && isEnvBrowser()) {
    for (const event of events) {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: {
              action: event.action,
              data: event.data,
            },
          }),
        )
      }, timer)
    }
  }
}

export const debugAnimals = [
  {
    id: 1,
    name: "Cat",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 2,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 3,
    name: "Cat",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 4,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 5,
    name: "Cat",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 6,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 7,
    name: "Cat",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 8,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 9,
    name: "Cat",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 10,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 11,
    name: "Cat",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 12,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
  {
    id: 13,
    name: "Dog",
    owner: "owner",
    pedIdentifier: "char1:_aoidoakd",
    image: ""
  },
]