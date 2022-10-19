import { useState, useEffect} from 'react'


export default function useOffSetTop(top: number) {
    const [offSetTop, setOffSetTop] = useState(false);
    const isTop = top || 100

    useEffect(() => {
        window.onscroll = () => {
            if (window.pageYOffset > isTop) {
                setOffSetTop(true)
            } else {
                setOffSetTop(false)
            }
        };
        return () => {
            window.onscroll = null;
        }
    }, [isTop])

    return offSetTop
}