const BackToLogin = () => {
    return (
        <a
            href="/login"
            className="absolute top-4 right-4 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
    );
};

export default BackToLogin;