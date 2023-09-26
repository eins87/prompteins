import { Skeleton } from '@mui/material';

const PromptCardSkeleton = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='prompt_card'>
        <div className='flex items-start justify-between gap-5'>
          <div className='flex items-center justify-start flex-1 gap-3'>
            <Skeleton
              variant="circular"
              width={40}
              height={40} />
            <div className='flex flex-col'>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={200} height={20} />
            </div>
          </div>
          <div className='copy_btn'>
            <Skeleton variant="circular" width={12} height={12} />
          </div>
        </div>
        <Skeleton variant="text" width="100%" height={20} className='mt-4' />
        <Skeleton variant="text" width={150} height={20} />
        <div className='flex w-full gap-5 mt-4'>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={100} height={20} />
        </div>
      </div>
    </div>    
  )
}

export default PromptCardSkeleton