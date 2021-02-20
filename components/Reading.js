const Reading = () => {
    return <div>
        <div className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="lg:w-1/2">
                    <div className="h-64 bg-cover lg:rounded-lg lg:h-full" style="background-image:url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80')"></div>
                </div>
                <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                    <h2 className="text-3xl text-gray-800 font-bold">Build Your New <span className="text-indigo-600">Idea</span></h2>
                    <p className="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.</p>
                    <div className="mt-8">
                        <a href="#" className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Start Now</a>
                    </div>
                </div>
            </div>
        </div> 
    </div>
        
}

export default Reading

