import { getUser } from '../../auth/getUser'
import { telefunc, telefuncConfig, provideTelefuncContext } from 'telefunc'

telefuncConfig.telefuncUrl = '/api/_telefunc'

export default async function (req, res) {
  const user = getUser(req)
  provideTelefuncContext({ user })
  const { url, method, body } = req
  const httpRequest = { url, method, body }
  const httpResponse = await telefunc(httpRequest)
  res.status(httpResponse.statusCode).send(httpResponse.body)
}
