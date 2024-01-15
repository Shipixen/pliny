// noinspection TypeScriptMissingConfigOption

import {
  KBarPortal,
  KBarSearch,
  KBarAnimator,
  KBarPositioner,
  KBarResults,
  useMatches,
  Action,
  useRegisterActions,
} from '@shipixen/kbar'

export const KBarModal = ({
  actions,
  isLoading,
  loadingLabel,
  noResultsLabel,
  searchLabel,
}: {
  actions: Action[]
  isLoading: boolean
  loadingLabel: string
  noResultsLabel: string
  searchLabel: string
}) => {
  useRegisterActions(actions, [actions])

  return (
    <KBarPortal>
      <KBarPositioner className="z-10 bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
        <KBarAnimator className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center space-x-4 p-4">
              <span className="block w-5">
                <svg
                  className="text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <KBarSearch
                defaultPlaceholder={searchLabel}
                className="border-b border-solid border-transparent h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:border-gray-500/20 focus:shadow-none focus:outline-none focus:!ring-transparent focus:!ring-offset-transparent dark:text-gray-200 dark:placeholder-gray-500 transition-all"
              />
              <kbd className="inline-block whitespace-nowrap rounded border px-1.5 align-middle font-medium leading-4 tracking-wide text-xs text-gray-400 border-gray-400">
                ESC
              </kbd>
            </div>
            {!isLoading && <RenderResults noResultsLabel={noResultsLabel} />}
            {isLoading && (
              <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
                {loadingLabel}
              </div>
            )}
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

const RenderResults = ({ noResultsLabel }: { noResultsLabel: string }) => {
  const { results } = useMatches()

  if (results.length) {
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div>
            {typeof item === 'string' ? (
              <div className="pt-3">
                <div className="block border-t border-gray-100 px-4 pb-2 pt-6 text-xs font-semibold uppercase text-primary-600 dark:border-gray-800">
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`flex cursor-pointer justify-between px-4 py-2 ${
                  active
                    ? 'bg-primary-600 text-gray-100'
                    : 'text-gray-700 dark:text-gray-100 bg-transparent'
                }`}
              >
                <div className={'flex space-x-2'}>
                  {item.icon && <div className={'self-center'}>{item.icon}</div>}
                  <div className="block">
                    {item.subtitle && (
                      <div className={`${active ? 'text-gray-200' : 'text-gray-400'} text-xs`}>
                        {item.subtitle}
                      </div>
                    )}
                    <div>{item.name}</div>
                  </div>
                </div>
                {item.shortcut?.length ? (
                  <div aria-hidden className="flex flex-row items-center justify-center gap-x-2">
                    {item.shortcut.map((sc) => (
                      <kbd
                        key={sc}
                        className={`font-medium h-7 w-6 flex items-center	justify-center text-xs rounded border ${
                          active ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-gray-400'
                        }`}
                      >
                        {sc}
                      </kbd>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      />
    )
  } else {
    return (
      <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
        {noResultsLabel}
      </div>
    )
  }
}
