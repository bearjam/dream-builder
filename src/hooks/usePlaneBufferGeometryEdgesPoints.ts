import { PlaneBufferGeometry } from "three"
import { chunksOf, filterWithIndex } from "fp-ts/ReadonlyArray"
import { pipe } from "fp-ts/function"
import { useMemo } from "react"
import * as THREE from "three"

export default function usePlaneBufferGeometryEdgesPoints(
  geom: PlaneBufferGeometry
) {
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(geom), [geom])
  return pipe(
    pipe(Array.from(edgesGeom.attributes.position.array), chunksOf(3)) as [
      number,
      number,
      number
    ][],
    filterWithIndex((i) => i !== 1)
  ) as [number, number, number][]
}
