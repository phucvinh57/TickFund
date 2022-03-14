export default function Activity({ content, link }) {
    return <div>
        {content}
        {link && <a href={link.href} className='ms-1 text-secondary'>
            {link.text}
        </a>}
    </div>
}