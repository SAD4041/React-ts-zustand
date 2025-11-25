const NameBio = () => {
  // const{ fullName, bio} = {"saman", "سلااام صبحت بخیررر"} ;
  const fullName = "سامان خواجه امیری";
  const bio = " موجودی به درد نخور مخصوصا در رفاقت و کار های وابسته به آن";
  return (
    <div className="px-2">
      <p className="mb-2 text-profile-title-size text-right font-medium md:text-2xl text-black-500">
        {fullName}
      </p>

      <p className="text-profile-paragraph-size text-right sm:text-sm md:text-base text-black-500">
        {bio}
      </p>
    </div>
  );
};
export default NameBio;
