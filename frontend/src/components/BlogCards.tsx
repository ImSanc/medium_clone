interface BlogCardProps{
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}

export const BlogsCard  = ({
    authorName,
    title,
    content,
    publishedDate
} : BlogCardProps) => {

    return <div>
        <div>
            {authorName}. {publishedDate}
        </div>
        <div>
            {title}
        </div>
        <div>
            { content.slice(0,100) + "..." }
        </div>
        <div>
            { `${ Math.ceil( content.length / 100)} minutes`}
        </div>
        
    </div>
}