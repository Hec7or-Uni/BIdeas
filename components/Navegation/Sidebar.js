import SiteButton from "../SiteButton"

const data = [
    {
        id: 1,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        name: 'home',
        url: '/home',
        links: []
    },{
        id: 2,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        name: 'my profile',
        url: '/my-profile',
        links: []
    },{
        id: 3,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        name: 'my team',
        url: '/my-team',
        links: []
    },{
        id: 4,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        name: 'careers',
        url: '',
        links: [
            {
                id: 1,
                name: 'Teams',
                url: '/careers/teams'
            },
            {
                id: 2,
                name: 'Professionals',
                url: '/careers/professionals'
            }
        ]
    }
]

export default function Sidebar({ site }) {
    return (
        <nav className="flex flex-col w-80 bg-gray-100 p-4">
            {data.map(item => {
                return <SiteButton key={item.id} icon={item.icon} site={item.name} url={item.url} links={item.links} />
            })}
        </nav>
    )
}