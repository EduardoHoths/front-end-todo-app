import {useEffect} from "react";

interface HeadProps {
    title: string;
    description: string;
}

export const Head = ({title, description}: HeadProps) => {
    useEffect(() =>{
        document.title = title + " | Todo"
        document.querySelector("meta[name='description']")!.setAttribute('content', description)
    })

    return <></>;
};
