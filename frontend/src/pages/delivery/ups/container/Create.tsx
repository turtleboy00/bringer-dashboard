import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Countries from "../../../assets/countries.json";
import Button from "react-bootstrap/Button";

interface Country {
  name: string;
  code: string;
}

const Label = () => {
  let [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();
  const { register, getValues, setValue } = useForm({
    defaultValues: {
      "shipper": {
        "Name": "Eduardo Guerra",
        "AttentionName": "Eduardo Guerra",
        "TaxIdentificationNumber": "78408010999",
        "Phone": {
          "Number": "+13052139722",
        },
        "ShipperNumber": "3826E9",
        "Address": {
          "AddressLine": "8351 Nw 21 St",
          "City": "Miami",
          "StateProvinceCode": "FL",
          "PostalCode": "33130",
          "CountryCode": "US"
        },
      },
      "reciever": {
        "Name": "Eduardo Guerra",
        "AttentionName": "Eduardo Guerra",
        "Phone": {
          "Number": "+13052139722",
        },
        "TaxIdentificationNumber": "78408010999",
        "Address": {
          "AddressLine": "Av. Ibirapuera, 2064",
          "City": "Sao Paulo",
          "StateProvinceCode": "SP",
          "PostalCode": "04028-001",
          "CountryCode": "BR"
        },
      },
    },
  });

  const URL = process.env.REACT_APP_BE_URL;
  const PORT = process.env.REACT_APP_BE_PORT;

  useEffect(() => {
    document.title = "UPS: Label";
    setCountries(Countries);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const shipper = getValues("shipper");
    const reciever = getValues("reciever");

    setValue("reciever.AttentionName", reciever.Name);
    setValue("shipper.AttentionName", shipper.Name);
    setValue("shipper.TaxIdentificationNumber", "78408010999");
    setValue("reciever.TaxIdentificationNumber", "78408010999");
    setValue("shipper.ShipperNumber", "3826E9");

    await fetch(`http://${URL}:${PORT}/delivery/ups/create-label/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shipper, reciever }),
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw Error(res.statusText);
        }

        return res.json();
      })
      .then(message => navigate('/delivery/ups/label', { replace: true, state: message} ))
      .catch((err) => console.warn);
  };

  return (
    <>
      <h1>Create Label</h1>
      <h2 className="mt-3">Shipper</h2>
      <form className="w-full max-w-lg mb-10">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-name"
              type="text"
              placeholder="Name"
              {...register("shipper.Name")}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-phone"
              type="text"
              placeholder="Phone"
              {...register("shipper.Phone.Number")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-center">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address"
              type="text"
              placeholder="Address"
              {...register("shipper.Address.AddressLine")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="City"
              {...register("shipper.Address.City")}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Country
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-shipper-country"
                value="US"
                {...register("shipper.Address.CountryCode")}
              >
                <option disabled value="">Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              State/Province
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-stateprovince-code"
              type="text"
              placeholder="State/Province"
              {...register("shipper.Address.StateProvinceCode")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-center">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="Zip"
              {...register("shipper.Address.PostalCode")}
            />
          </div>
        </div>
      </form>

      <h2>Reciever</h2>
      <form className="w-full max-w-lg mb-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Name"
              {...register("reciever.Name")}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-phone"
              type="text"
              placeholder="Phone"
              {...register("reciever.Phone.Number")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-center">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address"
              type="text"
              placeholder="Address"
              {...register("reciever.Address.AddressLine")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="City"
              {...register("reciever.Address.City")}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Country
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-reciever-country"
                value="BR"
                {...register("reciever.Address.CountryCode")}
              >
                <option disabled value="">Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              State/Province
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-stateprovince-code"
              type="text"
              placeholder="State/Province"
              {...register("reciever.Address.StateProvinceCode")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-center">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="Zip"
              {...register("reciever.Address.PostalCode")}
            />
          </div>
        </div>
      </form>
      <Button
        onClick={handleSubmit}
      >
        Generate Label
      </Button>
    </>
  );
};

export default Label;
