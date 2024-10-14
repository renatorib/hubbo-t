function createIcon(paths: string[]) {
  return function Icon(props: React.ComponentProps<"svg">) {
    return (
      <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {paths.map((d, index) => (
          <path key={index} d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    );
  };
}

export const TimeIcon = createIcon([
  "M12.061 22.3774C17.5839 22.3774 22.061 17.9003 22.061 12.3774C22.061 6.85459 17.5839 2.37744 12.061 2.37744C6.53819 2.37744 2.06104 6.85459 2.06104 12.3774C2.06104 17.9003 6.53819 22.3774 12.061 22.3774Z",
  "M12.061 6.37744V12.3774L16.061 14.3774",
]);

export const CalendarIcon = createIcon([
  "M19.061 4.37744H5.06104C3.95647 4.37744 3.06104 5.27287 3.06104 6.37744V20.3774C3.06104 21.482 3.95647 22.3774 5.06104 22.3774H19.061C20.1656 22.3774 21.061 21.482 21.061 20.3774V6.37744C21.061 5.27287 20.1656 4.37744 19.061 4.37744Z",
  "M16.061 2.37744V6.37744",
  "M8.06104 2.37744V6.37744",
  "M3.06104 10.3774H21.061",
]);

export const ChevronRightIcon = createIcon(["M9.06104 18.3774L15.061 12.3774L9.06104 6.37744"]);

export const HomeIcon = createIcon([
  "M3.06104 9.37744L12.061 2.37744L21.061 9.37744V20.3774C21.061 20.9079 20.8503 21.4166 20.4752 21.7917C20.1002 22.1667 19.5915 22.3774 19.061 22.3774H5.06104C4.5306 22.3774 4.02189 22.1667 3.64682 21.7917C3.27175 21.4166 3.06104 20.9079 3.06104 20.3774V9.37744Z",
  "M9.06104 22.3774V12.3774H15.061V22.3774",
]);

export const CommentIcon = createIcon([
  "M21.5679 11.5342C21.5713 12.8541 21.2629 14.1561 20.6679 15.3342C19.9623 16.746 18.8776 17.9334 17.5353 18.7635C16.193 19.5936 14.6461 20.0336 13.0679 20.0342C11.748 20.0376 10.446 19.7293 9.26787 19.1342L3.56787 21.0342L5.46787 15.3342C4.8728 14.1561 4.56443 12.8541 4.56787 11.5342C4.56848 9.95597 5.00848 8.40906 5.83859 7.06676C6.6687 5.72446 7.85613 4.63978 9.26787 3.93421C10.446 3.33914 11.748 3.03077 13.0679 3.03421H13.5679C15.6522 3.1492 17.6209 4.02897 19.097 5.50507C20.5731 6.98116 21.4529 8.94986 21.5679 11.0342V11.5342Z",
]);

export const ThumbsUpIcon = createIcon([
  "M7.021 11.8384L11.021 2.83838C11.8166 2.83838 12.5797 3.15445 13.1423 3.71706C13.7049 4.27967 14.021 5.04273 14.021 5.83838V9.83838H19.681C19.9709 9.8351 20.2581 9.89488 20.5226 10.0136C20.7871 10.1323 21.0226 10.3071 21.2129 10.5259C21.4031 10.7447 21.5435 11.0022 21.6243 11.2806C21.7052 11.5591 21.7245 11.8517 21.681 12.1384L20.301 21.1384C20.2287 21.6153 19.9864 22.05 19.6189 22.3624C19.2514 22.6748 18.7833 22.8438 18.301 22.8384H7.021M7.021 11.8384V22.8384M7.021 11.8384H4.021C3.49056 11.8384 2.98186 12.0491 2.60678 12.4242C2.23171 12.7992 2.021 13.3079 2.021 13.8384V20.8384C2.021 21.3688 2.23171 21.8775 2.60678 22.2526C2.98186 22.6277 3.49056 22.8384 4.021 22.8384H7.021",
]);

export const MoonIcon = createIcon([
  "M20.9999 12.79C20.8426 14.4922 20.2038 16.1144 19.1581 17.4668C18.1125 18.8192 16.7034 19.8458 15.0956 20.4265C13.4878 21.0073 11.7479 21.1181 10.0794 20.7461C8.41092 20.3741 6.8829 19.5345 5.67413 18.3258C4.46536 17.117 3.62584 15.589 3.25381 13.9205C2.88178 12.252 2.99262 10.5121 3.57336 8.9043C4.15411 7.29651 5.18073 5.88737 6.53311 4.84175C7.8855 3.79614 9.5077 3.15731 11.2099 3C10.2133 4.34827 9.73375 6.00945 9.85843 7.68141C9.98312 9.35338 10.7038 10.9251 11.8893 12.1106C13.0748 13.2961 14.6465 14.0168 16.3185 14.1415C17.9905 14.2662 19.6516 13.7866 20.9999 12.79Z",
]);

export const SunIcon = createIcon([
  "M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z",
  "M12 1V3",
  "M12 21V23",
  "M4.22021 4.22021L5.64021 5.64021",
  "M18.3599 18.3599L19.7799 19.7799",
  "M1 12H3",
  "M21 12H23",
  "M4.22021 19.7799L5.64021 18.3599",
  "M18.3599 5.64021L19.7799 4.22021",
]);