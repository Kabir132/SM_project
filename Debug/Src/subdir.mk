################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Src/bmp2.c \
../Src/bmp2_config.c \
../Src/dio.c \
../Src/heater.c \
../Src/heater_config.c \
../Src/main.c \
../Src/pid_controller.c \
../Src/pid_controller_config.c \
../Src/stm32f7xx_hal_msp.c \
../Src/stm32f7xx_it.c \
../Src/syscalls.c \
../Src/sysmem.c \
../Src/system_stm32f7xx.c 

OBJS += \
./Src/bmp2.o \
./Src/bmp2_config.o \
./Src/dio.o \
./Src/heater.o \
./Src/heater_config.o \
./Src/main.o \
./Src/pid_controller.o \
./Src/pid_controller_config.o \
./Src/stm32f7xx_hal_msp.o \
./Src/stm32f7xx_it.o \
./Src/syscalls.o \
./Src/sysmem.o \
./Src/system_stm32f7xx.o 

C_DEPS += \
./Src/bmp2.d \
./Src/bmp2_config.d \
./Src/dio.d \
./Src/heater.d \
./Src/heater_config.d \
./Src/main.d \
./Src/pid_controller.d \
./Src/pid_controller_config.d \
./Src/stm32f7xx_hal_msp.d \
./Src/stm32f7xx_it.d \
./Src/syscalls.d \
./Src/sysmem.d \
./Src/system_stm32f7xx.d 


# Each subdirectory must supply rules for building sources it contributes
Src/%.o Src/%.su Src/%.cyclo: ../Src/%.c Src/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m7 -std=gnu11 -g3 -DDEBUG -DARM_BITREVERSAL -DARM_CFFT_T16 -D__FPU_PRESENT=1 -DARM_MATH_CM7 -DUSE_HAL_DRIVER -DSTM32F756xx -c -I../Inc -I../Drivers/STM32F7xx_HAL_Driver/Inc -I../Drivers/STM32F7xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F7xx/Include -I../Drivers/CMSIS/Include -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/Core/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/Core_A/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/PrivateInclude/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/PrivateInclude -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/Include -I../Middlewares/Third_Party/ARM_CMSIS/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/PrivateInclude/ -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv5-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Src/main.o: ../Src/main.c Src/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m7 -std=gnu11 -g3 -DDEBUG -DARM_BITREVERSAL -DARM_CFFT_T16 -D__FPU_PRESENT=1 -DARM_MATH_CM7 -DUSE_HAL_DRIVER -DSTM32F756xx -c -I../Inc -I../Drivers/STM32F7xx_HAL_Driver/Inc -I../Drivers/STM32F7xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F7xx/Include -I../Drivers/CMSIS/Include -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/Core/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/Core_A/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/PrivateInclude/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/PrivateInclude -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/CMSIS/DSP/Include -I../Middlewares/Third_Party/ARM_CMSIS/Include/ -I../Middlewares/Third_Party/ARM_CMSIS/PrivateInclude/ -O0 -ffunction-sections -fdata-sections -Wall -u _printf_float -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv5-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-Src

clean-Src:
	-$(RM) ./Src/bmp2.cyclo ./Src/bmp2.d ./Src/bmp2.o ./Src/bmp2.su ./Src/bmp2_config.cyclo ./Src/bmp2_config.d ./Src/bmp2_config.o ./Src/bmp2_config.su ./Src/dio.cyclo ./Src/dio.d ./Src/dio.o ./Src/dio.su ./Src/heater.cyclo ./Src/heater.d ./Src/heater.o ./Src/heater.su ./Src/heater_config.cyclo ./Src/heater_config.d ./Src/heater_config.o ./Src/heater_config.su ./Src/main.cyclo ./Src/main.d ./Src/main.o ./Src/main.su ./Src/pid_controller.cyclo ./Src/pid_controller.d ./Src/pid_controller.o ./Src/pid_controller.su ./Src/pid_controller_config.cyclo ./Src/pid_controller_config.d ./Src/pid_controller_config.o ./Src/pid_controller_config.su ./Src/stm32f7xx_hal_msp.cyclo ./Src/stm32f7xx_hal_msp.d ./Src/stm32f7xx_hal_msp.o ./Src/stm32f7xx_hal_msp.su ./Src/stm32f7xx_it.cyclo ./Src/stm32f7xx_it.d ./Src/stm32f7xx_it.o ./Src/stm32f7xx_it.su ./Src/syscalls.cyclo ./Src/syscalls.d ./Src/syscalls.o ./Src/syscalls.su ./Src/sysmem.cyclo ./Src/sysmem.d ./Src/sysmem.o ./Src/sysmem.su ./Src/system_stm32f7xx.cyclo ./Src/system_stm32f7xx.d ./Src/system_stm32f7xx.o ./Src/system_stm32f7xx.su

.PHONY: clean-Src

