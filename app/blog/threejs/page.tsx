"use client"
import React, { useEffect, useRef } from 'react';
import CHeader from "@/app/blog/CustomHeader"
import {useRouter} from "@bprogress/next"
import * as THREE from 'three';
import type {ShaderMaterialParameters} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
// import { Line2 } from 'three/addons/lines/Line2.js';
// import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
// import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
// import dmzsvg from '@/assets/svg/大拇指.svg'
import "./index.scss"
import { ArrowLeftOutlined } from '@ant-design/icons';


const Index = () => {
  const nextRouter = useRouter()
    const threeref = useRef<HTMLDivElement>(null)
    const initFn = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, (threeref?.current?.offsetWidth || 0) / (threeref?.current?.offsetHeight || 1), 0.1, 1000);
        // 设置背景颜色为深蓝色
        //   scene.background = new THREE.Color(0x000066);
        const renderer = new THREE.WebGLRenderer({
            antialias: true, //开启锯齿
            alpha: true
        });
        let timeVal = 0;
        // 设置背景颜色
        renderer.setClearColor("#a5c7a5", 1); //0是完全透明，1是不透明
        renderer.setSize((threeref?.current?.offsetWidth || 0), (threeref?.current?.offsetHeight || 1));

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: "#bfe5ba" });
        const cube = new THREE.Mesh(geometry, material);
        // scene.add( cube );

        var axes = new THREE.AxesHelper(200);
        // scene.add(axes);


        scene.add(new THREE.AmbientLight("#f00"))

        const sphere = new THREE.SphereGeometry(0.5, 16, 18);
        let light1 = new THREE.PointLight("#f00", 60000);
        light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: "#e0003f" })));
        // scene.add(light1);
        light1.position.x = 50
        light1.position.y = 50
        light1.position.z = 100

        
  const sphereSize = 6;
  const pointLightHelper = new THREE.PointLightHelper( light1, sphereSize );
  scene.add( pointLightHelper );

        let light2 = new THREE.PointLight("#ffffff", 60000);
        scene.add(light2);
        light2.position.x = 50
        light2.position.y = 50
        light2.position.z = -100

        const createShapeFn = (options:any) => {
            const heartShape = new THREE.Shape();
            let shapeRadius = options.radius
            let shapeWidth = options.width
            let shapeHeight = options.height
            heartShape.moveTo(0, -shapeHeight / 2);
            heartShape.lineTo((shapeWidth - shapeRadius * 2) / 2, -shapeHeight / 2)
            heartShape.absarc((shapeWidth - shapeRadius * 2) / 2, -(shapeHeight - shapeRadius * 2) / 2, shapeRadius, -Math.PI / 2, 0, false);
            heartShape.lineTo(shapeWidth / 2, (shapeHeight - shapeRadius * 2) / 2);
            heartShape.absarc((shapeWidth - shapeRadius * 2) / 2, shapeHeight / 2 - shapeRadius, shapeRadius, 0, Math.PI / 2, false);
            //
            heartShape.lineTo(-(shapeWidth - shapeRadius * 2) / 2, shapeHeight / 2);
            heartShape.absarc(-(shapeWidth - shapeRadius * 2) / 2, (shapeHeight - shapeRadius * 2) / 2, shapeRadius, Math.PI / 2, -Math.PI, false);
            heartShape.lineTo(-shapeWidth / 2, -(shapeHeight - shapeRadius * 2) / 2);
            heartShape.absarc(-(shapeWidth / 2 - shapeRadius), -(shapeHeight / 2 - shapeRadius), shapeRadius, Math.PI, Math.PI * 3 / 2, false);
            heartShape.closePath()
            return heartShape
        }
        const createPortFn = (options:any) => {
            const extrudeSettings = {
                depth: options.deep,
                bevelEnabled: false,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 1,
                bevelThickness: 1
            };

            const geometry = new THREE.ExtrudeGeometry(createShapeFn(options), extrudeSettings);

            const mesh = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
                transparent: true,
                // alphaTest: 0.5, // 透明度测试阈值，0.0 到 1.0 之间
                depthWrite: false, // 禁用深度写入
                // side: THREE.DoubleSide,
                uniforms: {
                    time: {
                        type: 'f',
                        value: 0
                    },
                    startZ: {
                        type: 'f',
                        value: portInfo.deep
                    },
                    color2: {
                        type: 'v3',
                        value: new THREE.Color("#5500ff")
                    }
                },
                vertexShader: `
                  varying vec3 vPosition;
                              void main() {
                                  vPosition = position;
                                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                              }
                          `,
                fragmentShader: `
                              varying vec3 vPosition;
                              uniform vec3 color2;
                              uniform float startZ;
                              void main() {
                                  gl_FragColor = vec4(color2,  .3 * smoothstep(30. ,0., vPosition.z));
                                  //gl_FragColor = vec4(color2, 1. / pow(vPosition.z / startZ, 3.));
                              }
                          `
            } as ShaderMaterialParameters));
            return mesh
        }



        const createDiZuoFn = (options:any) => {
            const extrudeSettings = {
                depth: options.deep,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 1,
                bevelThickness: 1
              };
            const geometry = new THREE.ExtrudeGeometry(createShapeFn(options), extrudeSettings);
            const mesh = new THREE.Mesh(geometry, [
                new THREE.MeshPhongMaterial({
                    color: "#021a3e"
                  }),
                  new THREE.MeshPhongMaterial({
                    color: "#021a3e"
                  })
            ]);
            return mesh
        }
        const dizuoTransformInfo = {
            rotateX: Math.PI / 180 * 90,
            translateZ: -10
        }

        const portInfo = {
            width: 16,
            height: 6,
            radius: 3,
            deep: 50,
        }
        const dizuoRect = {
            width: 50,
            height: 50,
        };

        const createPortList = () => {
            const port1 = createPortFn({
                x: 0,
                y: 0,
                z: 0,
                ...portInfo
            });
            port1.translateZ(dizuoRect.width / 2)

            const port2 = createPortFn({
                x: 0,
                y: 0,
                z: 0,
                ...portInfo
            });
            port2.rotateY(Math.PI / 2)
            port2.translateZ(dizuoRect.width / 2)

            const port3 = createPortFn({
                x: 0,
                y: 0,
                z: 0,
                ...portInfo
            });
            port3.rotateY(-Math.PI / 2)
            port3.translateZ(dizuoRect.width / 2)

            const port4 = createPortFn({
                x: 0,
                y: 0,
                z: 0,
                ...portInfo
            });
            port4.rotateY(Math.PI * 2 / 2)
            port4.translateZ(dizuoRect.width / 2)
            scene.add(port4);

            return [port1, port2, port3, port4]
        }
        const dizuoScene = new THREE.Scene()

        dizuoScene.add(...createPortList());

        const dizuo1 = createDiZuoFn({
            ...dizuoRect,
            x: 0,
            y: 0,
            z: 0,
            radius: 6,
            deep: 20,
        });
        dizuo1.rotateX(dizuoTransformInfo.rotateX);
        dizuo1.translateZ(dizuoTransformInfo.translateZ)

        dizuoScene.add(dizuo1);
        dizuoScene.translateZ(dizuoTransformInfo.translateZ - 100)

        scene.add(dizuoScene)

        const dizuo2 = createDiZuoFn({
            ...dizuoRect,
            x: 0,
            y: 0,
            z: 0,
            radius: 6,
            deep: 20,
        });
        dizuo2.rotateX(dizuoTransformInfo.rotateX);
        dizuo2.translateZ(dizuoTransformInfo.translateZ)
        const dizuoScene2 = new THREE.Scene()
        dizuoScene2.add(dizuo2);
        dizuoScene2.translateZ(dizuoTransformInfo.translateZ + 100)
        dizuoScene2.add(...createPortList());

        scene.add(dizuoScene2)

        // 信息传递动效
        var infoAnimateGeometry = new THREE.BoxGeometry(portInfo.width * 0.8, portInfo.height * 0.8, 200);
        var baseMaterial = new THREE.ShaderMaterial({
            transparent: true,
            // alphaTest: 0.5, // 透明度测试阈值，0.0 到 1.0 之间
            depthWrite: false, // 禁用深度写入
            side: THREE.DoubleSide,
            uniforms: {
                time: {
                    type: 'f',
                    value: timeVal
                },
                startZ: {
                    type: 'f',
                    value: portInfo.deep
                },
                color2: {
                    type: 'v3',
                    value: new THREE.Color("#bca7e7")
                }
            },
            vertexShader: `
            varying vec3 vPosition;
						void main() {
							vPosition = position;
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`,
            fragmentShader: `
						varying vec3 vPosition;
						varying float pi;
						uniform vec3 color2;
						uniform float startZ;
						uniform float time;
						void main() {
						  float pi = 3.1415;
							gl_FragColor = vec4(color2,  0.5 * abs(sin(pi / 100.*(vPosition.z)+ time * 0.5)));
						}
					`
        } as ShaderMaterialParameters)
        let infoCube = new THREE.Mesh(infoAnimateGeometry, baseMaterial);
        infoCube.position.set(0, 0, 0);
        scene.add(infoCube);


        const triangleShape = new THREE.Shape()
            .moveTo(80, 20)
            .lineTo(40, 80)
            .lineTo(120, 80)
            .lineTo(80, 20); // close path
        let points = triangleShape.getPoints()
        // const geometryPoints = new LineGeometry()
        // console.log(points);
        // let position = [];
        // points = [
        //     {
        //         x: -25,
        //         y: 25,
        //         z: 0
        //     },
        //     {
        //         x: 25,
        //         y: 25,
        //         z: 0
        //     },
        //     {
        //         x: 25,
        //         y: -25,
        //         z: 0
        //     },
        //     {
        //         x: -25,
        //         y: -25,
        //         z: 0
        //     },
        //     {
        //         x: -25,
        //         y: 25,
        //         z: 0
        //     }
        // ];
        // points.forEach((poi) => {
        //     position.push(poi.x, poi.y, poi.z);
        // })

        // geometryPoints.setPositions(position);

        // let line = new Line2(geometryPoints, new LineMaterial({
        //     color: "#f0f",
        //     // @ts-ignore
        //     linewidth: 6,
        //     vertexColors: THREE.VertexColors,   // 单独设置顶点颜色
        //     //resolution:  // renderer.render 时加上这个属性
        //     // dashed: true,
        //     // dashSize: 1,
        //     gapSize: 1,
        //     // defines: {
        //     //   USE_DASH: ''
        //     // }
        // }));
        // line.position.set(30, 30, 30);
        // scene.add( line );

        // // 相机灯
        // let light = new THREE.AmbientLight("#fff88e");
        // scene.add(light);
        // scene.add(camera);


        camera.position.x = -300;
        camera.position.y = 100;
        camera.position.z = 150;
        const controls = new OrbitControls(camera, renderer.domElement)
        threeref?.current?.appendChild(renderer.domElement);

        // 渲染循环
        function animate() {
            // console.log(scene);
            // scene.children.filter((d:any)=>d instanceof  THREE.Line2).map((f:any)=> {
            //   f.geometry.
            // })
            baseMaterial.uniforms.time.value += 0.1
            // console.log(timeVal);
            controls.update()
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();


    }

    useEffect(() => {
        initFn()
    }, [])
    return (
     <>
     
      <CHeader
        modelActiveCode="threejs"
        renderBack={() => {
          return <div
            onClick={() => {
              console.log('123', 123)
              nextRouter.replace("/blog")
            }}
            style={{ width: 100, textAlign: "right", cursor: "pointer" }}>
            <ArrowLeftOutlined className="header-back-icon" />返回
          </div>
        }}
      />
     <div>
            {/* <h1>threejs...</h1> */}
            <div className="three-class" ref={threeref}></div>
        </div>
     </>
        
    );
};


export default Index;
