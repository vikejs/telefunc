export { applyShield }

import { shieldApply, shieldIsMissing } from '../shield'
import { assertWarning } from '../../utils'
import type { Telefunction } from '../types'

async function applyShield(runContext: {
  telefunction: Telefunction
  telefunctionName: string
  telefunctionArgs: unknown[]
}) {
  const { telefunction } = runContext
  const hasShield = !shieldIsMissing(telefunction)
  assertWarning(
    hasShield || telefunction.length === 0,
    `The telefunction ${runContext.telefunctionName} accepts arguments yet is missing a \`shield()\`, see https://telefunc.com/shield`,
  )
  if (hasShield) {
    shieldApply(telefunction, runContext.telefunctionArgs)
  }
}