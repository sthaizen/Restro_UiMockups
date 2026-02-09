import { Planet } from '../components/planet';
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from 'react-responsive';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const Hero = () => {
    const isMobile = useMediaQuery({maxWidth: 853})
    const text = "i help growing brands and startup gain an\n unfair advantage through premium\n results driven web/apps" ;

    useGSAP(() => {
    gsap.to("#home", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });
  }, []);
    
  return  <section id ="home" className='flex flex-col justify-end min-h-screen '>
    <AnimatedHeaderSection subTitle={"Nice to meet you,I’m"} title={"Yathartha"} text={text} textColor={"text-blackS"}/>
    
    <figure className="absolute inset-0 -z-50" style={{ width: "100vw", height: "100vh" }}>
  <Canvas 
    shadows 
    camera={{ position: [0, 0, 10], fov: 35, near: 1, far: 50 }}
  >
    <ambientLight intensity={0.5} />
    <Float speed={1.5}>
    <Planet scale={isMobile? 1.5: 2}/>  {/*changint the size of the 3d model */}
    </Float>
    <Environment>
        <group rotation={[-Math.PI/3,4,1]}>
        <Lightformer
        form={"circle"}
        intensity={2}
        position={[0,5,-9]}
        scale={10}
        />

        <Lightformer
        form={"circle"}
        intensity={2}
        position={[0,3,1]}
        scale={10}
        />

        <Lightformer
        form={"circle"}
        intensity={2}
        position={[-5,-1,-1]}
        scale={10}
        />

        <Lightformer
        form={"circle"}
        intensity={2}
        position={[10,1,0]}
        scale={16}
        />

        </group>
    </Environment>

    {/* optional camera controls */}
    <OrbitControls enableZoom={false} />
  </Canvas>
</figure>

  </section>
}

export default Hero