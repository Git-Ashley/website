import { apiPrefix } from '@global/SiteConfig'


export async function getJson({
  url,
  onSuccess,
  onError,
}) {
  try {
    const apiUrl = apiPrefix + url;
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
    },
      method: 'GET',
    });
    if (!response.ok) {
      onError(response.status)
    }

    console.log('YO LOL!:', response)
    const json = await response.json();
    console.log(json);
    onSuccess(json)
  } catch (error) {
    console.error(error.message);
  }
}

async function postData() {

}
