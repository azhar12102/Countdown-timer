"use client"

import { useState,useEffect,useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Countdown(){
    const[duration,setDuration] = useState<number|string>("");
    const[timeleft,setTimeleft] = useState<number>(0);
    const[isactive,setIsactive] = useState<boolean>(false);
    const[ispaused,setIspaused] = useState<boolean>(false);
    const timerref = useRef<NodeJS.Timeout |null>(null);

    const handleDuration=():void =>{
        if(typeof duration === "number" && duration > 0){
            setTimeleft(duration);
            setIsactive(false);
            setIspaused(false);
            if (timerref.current){
                clearInterval(timerref.current)
            };
        };
    } // handleDuration arrow function

    const handleStart =():void =>{
        if(timeleft > 0){
            setIsactive(true);
            setIspaused(false);
        };
    };
 
    const handlePause =() :void =>{
        if(isactive){
            setIspaused(true);
            setIsactive(false);
            if(timerref.current){
                clearInterval(timerref.current);
            }
        }
    };
    
    const handleReset =():void =>{
        setIsactive(false);
        setIspaused(false);
        setTimeleft(typeof duration === "number"? duration : 0);
        if(timerref.current){
            clearInterval(timerref.current);
        }
        if(timerref.current){
            clearInterval(timerref.current);
        }

    }

    useEffect(()=>{
        if(isactive && !ispaused){
            timerref.current = setInterval(() => {
                setTimeleft((prevtime)=>{
                    if(prevtime <=1 ){
                clearInterval(timerref.current!)
                return 0;
                    }
                    return prevtime - 1

                })

                
                
            }, 1000); 
        }
        return()=>{
            if(timerref.current){
                clearInterval(timerref.current);
            }   
        }

    },[isactive,ispaused]);

    const formatTime =(time:number):string =>{
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
    }
const handleDurationchange =(e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
}
return(
        // Container div for centering the content
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
          {/* Timer box container */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
            {/* Title of the countdown timer */}
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
              Countdown Timer
            </h1>
            {/* Input and set button container */}
            <div className="flex items-center mb-6">
              <Input
                type="number"
                id="duration"
                placeholder="Enter duration in seconds"
                value ={duration}
                onChange={handleDurationchange}
                className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
              <Button
                onClick={handleDuration}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
              >
                Set
              </Button>
            </div>
            {/* Display the formatted time left */}
            <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
              {formatTime(timeleft)}
            </div>
            {/* Buttons to start, pause, and reset the timer */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleStart}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
              >
                {ispaused ? "Resume" : "Start"}
              </Button>
              <Button
                onClick={handlePause}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
              >
                Pause
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
)
}