import { MellM } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import {FC, useState} from 'react'
import CheckArr from '@/public/images/mell/checkArr.svg'
import { Range, getTrackBackground } from 'react-range';
import Thumb from '@/public/images/mell/autoplayThumb.svg'
import AutoBorder from '@/public/images/mell/autoplayBorder.svg'

interface AutoPlaySettingsProps {}

export const AutoPlaySettings:FC<AutoPlaySettingsProps> = () => {

    const [modalVisibility, setModalVisibility] = useUnit([
        MellM.$autoplay,
        MellM.setAutoPlay
    ])

    const [turboChecked, setTurboChecked] = useState(false)
    const [fastgameChecked, setFastgameChecked] = useState(false)
    const [screensChecked, setScreensChecked] = useState(true)

    const [rangeValue, setRangeValue] = useState(0)

    return (
        <div className={`w-full h-full flex justify-center items-center absolute top-0 left-0 transition-all duration-300 bg-[rgba(0,_0,_0,_0.6)] z-[22] ${modalVisibility ? 'opacity-1 visible' : 'opacity-0 invisible'}`}>
            <div className='w-full max-w-[620px] p-[40px] m-[20px] relative text-center bg-[#050505F5]'>
                <X onClick={() => setModalVisibility(false)} className='absolute top-[20px] right-[20px] text-[#363636] cursor-pointer' />
                <span className='uppercase text-[16px] sm:text-[24px] font-normal text-[#fff]'>настройки автоматической игры</span>
                <div className='flex justify-center w-full'>
                    <div className='flex w-fit flex-col items-start sxs:flex-row sxs:items-center gap-[10px] justify-between mt-[30px]'>
                        <div onClick={() => setTurboChecked(!turboChecked)} className='flex uppercase select-none cursor-pointer text-[11px] sm:text-[14px] font-normal items-center gap-[10px]'>
                            <div className={`min-w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] border flex ${turboChecked && 'bg-[#29F061] border-none'} items-center justify-center  border-[#D9D9D9] rounded-[5px]`}>
                                {
                                    turboChecked && <CheckArr className='w-[15px] h-[15px]' />
                                }
                            </div>
                            турбоспин
                        </div>
                        <div onClick={() => setFastgameChecked(!fastgameChecked)} className='flex uppercase select-none text-start text-[11px] sm:text-[14px] font-normal cursor-pointer items-center gap-[10px]'>
                            <div className={`min-w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] border flex ${fastgameChecked && 'bg-[#29F061] border-none'} items-center justify-center border-[#D9D9D9] rounded-[5px]`}>
                                {
                                    fastgameChecked && <CheckArr className='w-[15px] h-[15px]' />
                                }
                            </div>
                            быстрая игра
                        </div>
                        <div onClick={() => setScreensChecked(!screensChecked)} className='flex uppercase select-none text-start text-[11px] sm:text-[14px] font-normal cursor-pointer items-center gap-[10px]'>
                            <div className={`min-w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] border flex ${screensChecked && 'bg-[#29F061] border-none'} items-center justify-center border-[#D9D9D9] rounded-[5px]`}>
                                {
                                    screensChecked && <CheckArr className='w-[15px] h-[15px]' />
                                }
                            </div>
                            не показывать <br/> экраны
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-[20px] mt-[50px] text-center'>
                    <span className="uppercase text-[20px] font-normal">количество автоматических спинов</span>
                    <div className='flex items-center gap-[10px]'>
                        <Range
                            step={1}
                            min={0}
                            max={100}
                            values={[rangeValue]}
                            onChange={(values) => setRangeValue(values[0])}
                            renderTrack={({ props, children }) => (
                                <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%"
                                }}
                            >
                                <div
                                ref={props.ref}
                                style={{
                                    height: "1px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                    values: [rangeValue],
                                    colors: ["#29F061", "#AAAAAA"],
                                    min: 0,
                                    max: 100
                                    }),
                                    alignSelf: "center"
                                }}
                                >
                                {children}
                                </div>
                            </div>
                            )}
                            renderThumb={({ props }) => (
                            <Thumb
                                {...props}
                                style={{...props.style}} 
                                className='w-[30px] h-[30px]'
                            />
                            )}
                        />
                        <span className="text-[24px] w-[60px] text-end font-normal">{rangeValue}</span>
                    </div>
                </div>
                <div className='mt-[30px] text-[14px] sm:text-[20px] font-normal uppercase m-[50px_auto_0_auto] w-[240px] sm:w-[380px] h-[85px] relative flex items-center justify-center'>
                    <AutoBorder className='w-full h-full top-0 left-0 absolute' />
                    начать автоигру ({rangeValue})
                </div>
            </div>
        </div>
    )
}