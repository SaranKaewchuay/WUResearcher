import { useEffect, useCallback ,useState} from "react";

const useInfiniteScroll = (callback) => {
    const [page, setPage] = useState(1);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const handleScroll = useCallback(() => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1;

    if (isBottom) {
      setPage((prevPage) => prevPage + 1);
      setIsLoadingAdd(true);
    }
  }, [callback]);

  useEffect(() => {
    const handleScrollEvent = () => handleScroll();

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [handleScroll]);

  return {page,isLoadingAdd};
};

export default useInfiniteScroll;
