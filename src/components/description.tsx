interface IDescriptionProps {
  data: string;
  className?: string;
}
function Description({data,className}: Readonly<IDescriptionProps>) {
  return <p className={`text-justify ${className}`}>
      {data}
      </p>

}

export default Description;